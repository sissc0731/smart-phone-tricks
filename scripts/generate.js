const fs=require('fs'),path=require('path'),today=new Date().toISOString().slice(0,10),slug=today;
const feed=JSON.parse(fs.readFileSync(path.join(__dirname,'..','feed.json'),'utf8'));
if(feed.posts.find(p=>p.slug===slug)){console.log('Exists');process.exit(0)}
const pool=[
[{title:'iPhone隐藏的10个实用功能，你可能一个都不知道',desc:'背面轻点截屏、扫描文稿、放大器、引导式访问、Safari阅读模式。每个都超实用。',tag:'iPhone技巧'},
{title:'微信这5个隐藏功能太实用了，90%的人不知道',desc:'长按相册调用系统相机画质更好、聊天记录云备份、提取图片文字、搜索表情包、提醒功能。',tag:'微信技巧'},
{title:'手机内存不够用？不用删照片也能清理出10G',desc:'清理微信缓存（不是聊天记录）、卸载不常用App、清除Safari/浏览器缓存、删除重复照片。',tag:'手机清理'}],
[{title:'手机拍出好看照片的8个技巧：不用学摄影',desc:'擦镜头是第一步、九宫格构图、找到光线方向、用人像模式拍虚化、后期用醒图微调。',tag:'拍照技巧'},
{title:'安卓手机越来越卡的救星：这5招让它变快',desc:'关闭动画缩放（开发者选项）、限制后台进程、清理无用文件、卸载国产全家桶App。',tag:'安卓技巧'},
{title:'手机电池不耐用？改这5个设置续航翻倍',desc:'关闭后台刷新、降低屏幕亮度、关掉不用的定位、开启低电量模式、换掉动态壁纸。',tag:'省电技巧'}],
[{title:'你不知道的抖音隐藏功能：追剧、学做菜、查快递',desc:'抖音不只是刷视频。搜索框搜做菜教程、打开全屏模式当电视看、关注实用知识博主。',tag:'App技巧'},
{title:'手机丢了第一时间应该做的5件事',desc:'用另一台手机登录iCloud或Find My Device锁定手机→远程抹除数据→挂失SIM卡→报警→改密码。',tag:'安全知识'},
{title:'老年人用手机必学的8个基础操作',desc:'调大字体、设置紧急联系人、语音输入代替打字、健康码快捷方式、防诈骗电话拦截。',tag:'长辈教学'}],
[{title:'手机剪映就能做视频：从零开始的剪辑教程',desc:'导入视频→裁剪片段→加转场→加字幕→加音乐→导出。10分钟学会基础剪辑。',tag:'视频剪辑'},
{title:'WiFi信号差？路由器旁边别放这5样东西',desc:'微波炉、蓝牙设备、金属物体、鱼缸、镜子都会干扰WiFi信号。路由器放高一点信号更好。',tag:'网络技巧'},
{title:'手机NFC功能到底怎么用？比你想的方便',desc:'碰一下付款、刷公交地铁、传照片、读银行卡余额、门禁卡模拟。不用开App直接碰一下。',tag:'实用功能'}],
[{title:'手机吃鸡/王者不卡设置：调对帧率很重要',desc:'关闭垂直同步、降低画质到流畅、开启性能模式、清理后台。游戏前重启手机关闭通知。',tag:'游戏优化'},
{title:'换新手机怎么把旧手机数据全部搬过来？',desc:'iPhone用快速开始或iCloud备份恢复。安卓用手机克隆或厂商搬家工具。微信聊天记录单独迁移。',tag:'换机指南'},
{title:'支付宝和微信支付的隐藏安全设置',desc:'开启指纹/面容支付、设置转账延迟到账、关闭小额免密、定期检查授权应用。',tag:'安全知识'}],
[{title:'淘宝拼多多便宜买的小技巧：不只是比价',desc:'用图片搜索同款、看差评不看好评、加购物车等降价通知、大促前先加收藏看是否真降价。',tag:'购物技巧'},
{title:'手机输入法的这些功能也太好用了吧',desc:'语音输入转文字、自定义快捷短语、滑动输入、剪贴板历史、表情包搜索。效率提升3倍。',tag:'效率技巧'},
{title:'家里老人的手机总是被装一堆垃圾App怎么办',desc:'关闭未知来源安装、设置安装密码、教会识别真假App图标、定期帮忙清理。',tag:'长辈教学'}],
[{title:'手机文件管理：照片和文档自动归类的方法',desc:'用Google相册或一刻相册自动备份+按人脸地点搜索。文件用云盘同步，本地定期清理。',tag:'效率技巧'},
{title:'不用数据线，手机电脑互传文件的5种方法',desc:'微信文件传输助手、QQ面对面快传、AirDrop、局域网共享、云盘同步。不同场景选不同方法。',tag:'实用功能'},
{title:'手机屏幕时间管理的4个方法：少刷手机多做事',desc:'设置App使用时间限制、开启勿扰模式定时、把常用App从首页移除、用Forest专注种树。',tag:'效率技巧'}],
[{title:'这些手机冷知识你知道吗：计算器可以算汇率',desc:'Spotlight搜索栏能做数学题、计算器旋转横屏变科学计算器、手电筒亮度可调、耳机孔能当自拍键。',tag:'冷知识'},
{title:'不同价位的手机怎么选？不花冤枉钱',desc:'2000以内性价比最高、4000以内选次旗舰去年的、8000以上买的是品牌溢价。看处理器不看摄像头像素。',tag:'购机指南'},
{title:'5G到底有没有用？要不要特意换5G套餐',desc:'日常使用4G和5G差别不大（刷视频看网页），5G优势在大文件下载和人多的地方。4G套餐也能用5G网络。',tag:'网络知识'}],
];
const idx=(new Date().getDate()-1)%pool.length,items=pool[idx];
const postTitle=`手机技巧 | ${items[0].tag}`;
feed.posts.unshift({slug,date:today,title:postTitle,items});feed.updated=today;
fs.writeFileSync(path.join(__dirname,'..','feed.json'),JSON.stringify(feed,null,2));
const html=`<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${postTitle}</title><meta name="description" content="${items.map(i=>i.title).join('、')}"><style>*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}:root{--bg:#fafafa;--card:#fff;--text:#1a1a2e;--t2:#666;--accent:#2563eb;--border:#e5e7eb;--r:10px}body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans SC",sans-serif;background:var(--bg);color:var(--text);line-height:1.7}.container{max-width:800px;margin:0 auto;padding:0 20px}header{background:var(--card);border-bottom:1px solid var(--border);padding:20px 0;margin-bottom:32px}header a{color:var(--accent);text-decoration:none;font-size:.9rem}header h1{font-size:1.3rem;margin-top:8px}.post{background:var(--card);border:1px solid var(--border);border-radius:var(--r);padding:28px}.post .date{color:var(--t2);font-size:.8rem;margin-bottom:20px}.entry{margin-bottom:24px;padding-bottom:20px;border-bottom:1px solid var(--border)}.entry:last-child{border-bottom:none}.entry h3{font-size:1rem;margin-bottom:4px}.entry p{color:var(--t2);font-size:.9rem}.tag{display:inline-block;background:#eff6ff;color:var(--accent);font-size:.72rem;padding:2px 8px;border-radius:10px;margin-left:6px}footer{text-align:center;padding:32px 20px;color:var(--t2);font-size:.8rem}@media(max-width:600px){.post{padding:18px}}</style></head><body><header><div class="container"><a href="../index.html">← 首页</a><h1>${postTitle}</h1></div></header><main class="container"><article class="post"><div class="date">📅 ${today}</div>${items.map(i=>`<div class="entry"><h3>${i.title} <span class="tag">${i.tag}</span></h3><p>${i.desc}</p></div>`).join('')}</article></main><footer><p>手机技巧 · 每日更新</p></footer></body></html>`;
fs.writeFileSync(path.join(__dirname,'..','posts',`${slug}.html`),html);
console.log('Generated:',postTitle);
