import { hasOwnProperty } from './utils';

const assignStaticPropsToClass = (...modules) => ComposedClass => {
  modules.forEach((module) => {
    Object.keys(module).forEach((functionName) => {
      if (process.env.NODE_ENV === 'development' && hasOwnProperty(ComposedClass, functionName)) {
        throw new Error(`Tried to assign static function to already esisting key ${functionName}`);
      }

      if (functionName.charAt(0) !== '_') {
        Object.defineProperty(ComposedClass, functionName, { value: module[functionName] });
      }
    });
  });

  return ComposedClass;
};

export default assignStaticPropsToClass;
