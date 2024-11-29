// trong ts không hỗ trở context cho required, nhưng ta cần thằng này để import nhiều file
declare var require: {
  (path: string): any;
  context(
    path: string,
    deep?: boolean,
    filter?: RegExp
  ): {
    keys(): string[];
  };
};
