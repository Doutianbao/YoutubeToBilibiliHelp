export const outDir = './videos'; // 下载目录

export const proxy = 'http://127.0.0.1:7890';
export const all_proxy = "socks5://127.0.0.1:7890/";

// puppeteer缓存数据
export const puppeteerUserDataDir = 'puppeteer/user/data';

export const puppeteerScreenshotDir = 'puppeteer/user/screenshot'

export const interval = 1000 * 60 * 10; // 监听频率 10分钟

export const waitForSelectorTimeout = 1000 * 60 * 60 * 2; // 等待上传时间