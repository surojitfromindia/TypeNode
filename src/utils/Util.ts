
class Util {

  static isEmpty<T>(obj: T): boolean {
    if (Array.isArray(obj)) {
      return obj.length === 0;
    }

    if (typeof obj === 'object' && obj !== null) {
      return Object.keys(obj).length === 0;
    }

    if (typeof obj === 'string') {
      return obj.length === 0;
    }

    if (obj === undefined) {
      return true;
    }
    if (obj === null) {
      return true;
    }

    return false;
  }

  static isNotEmpty<T>(obj: T): boolean {
    return !this.isEmpty(obj);
  }

  static hasStaticMethod(method_name: keyof typeof Util): boolean {
    return typeof Util[method_name] === 'function';
  }


  static removeElementFromArray(arrayLike: string[] | string, fields: string[] | string): string[] {
    let filtted_array:string[] = [];
    const remove_fields:string[] = Array.isArray(fields) ? fields : fields.split(',');
    const orginal_array = Array.isArray(arrayLike) ? arrayLike : arrayLike.split(',');

    filtted_array = orginal_array.filter((item:string) => !remove_fields.includes(item));
    return filtted_array;

  }
}

export default Util;
