import { isObject, hasOwnProperty } from './utils';

export default function assignStaticPropsToClass(Constructor, ...modules) {
  modules.forEach((module) => {
    Object.keys(module).forEach((functionName) => {
      if (process.env.NODE_ENV === 'development' && hasOwnProperty(Constructor, functionName)) {
        throw new Error(`Tried to assign static function to already esisting key ${functionName}`);
      }

      if (functionName.charAt(0) !== '_') {
        Constructor[functionName] = module[functionName];
      }
    });
  });
}
