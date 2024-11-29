// hàm giúp ta import tất cả những file có trong thư mục nào đó
function importAll(r: { keys(): string[]; (key: string): any }) {
  r.keys().forEach((key) => {
    r(key);
  });
}

export default importAll;
