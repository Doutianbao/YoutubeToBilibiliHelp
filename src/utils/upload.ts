import puppeteer from "puppeteer";
import path from "path";
import { log } from "./log";
import { isDev, puppeteerUserDataDir, USER_AGENT, waitForSelectorTimeout } from "../constant";
import { information, login, uploadFile, uploadThumbnail } from "../browser/blibli";
import { IChangedInfo } from "../listening";


export const upload = async (changedInfo: IChangedInfo) => {
    log("-----自动上传阶段开始-----\n");
    const {dirPath, filename} = changedInfo.video_info;

    const outputFile = path.resolve(dirPath, filename + ".output.mp4");
    const outputThumbnail = path.resolve(dirPath, filename + ".png");

    log("启动浏览器...\n");
    const browser = await puppeteer.launch({
        executablePath:"/usr/bin/google-chrome",
        //headless: !isDev, // 默认为true，无头模式
        args: ["--no-sandbox"],
        slowMo: 250,
        userDataDir: puppeteerUserDataDir,
        protocolTimeout: waitForSelectorTimeout
    });


    // 打开一个新tab页面
    const page = await browser.newPage();
    await page.setViewport({
        width: 1200,
        height: 1080,
        deviceScaleFactor: 1,
        isMobile: false,
        hasTouch: false
    });

    USER_AGENT && await page.setUserAgent(USER_AGENT);

    // 登录
    await login(page);

    // 文件上传
    await uploadFile(page, outputFile);

    // 上传封面
    await uploadThumbnail(page, outputThumbnail);

    // 填写信息
    await information(page, changedInfo);

    // 关闭浏览器
    await browser.close();
};
