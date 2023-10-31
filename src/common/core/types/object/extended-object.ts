export default class ExtendedObject extends Object {
  static safeAssign(target: any, source: any) {
    Object.keys(target).forEach((key) => {
      if (source.hasOwnProperty(key) && source[key]) {
        target[key] = source[key];
      }
    });
  }
}
