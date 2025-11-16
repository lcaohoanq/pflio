import { rainPoop } from "poopetti";

export function doRainPoop(onDone?: () => void, delay = 1200): void {
  // rainPoop(); // chạy animation
  rainPoop({
    emoji: ["💩", "😃", "😂", "😍", "😡", "😴", "😷", "😵", "😳", "😱"],
    duration: 3000,
    density: 500,
  });
  setTimeout(() => {
    onDone?.(); // gọi sau khi animation xong
  }, delay);
}
