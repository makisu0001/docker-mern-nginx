const text = "这是一个示例文本，包含了[视频1](https://example.com/video1)和[视频2](https://example.com/video2)"
const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
const links = [];
let match;
while ((match = regex.exec(text)) !== null) {
    console.log(match)
    const videoName = match[1];
    const videoSrc = match[2];
    links.push({ name: videoName, src: videoSrc });
}
console.log(links)