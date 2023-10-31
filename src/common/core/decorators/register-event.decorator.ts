export const eventClassRegistry: Record<string, any> = {};

export function RegisterEvent(): ClassDecorator {
  return (target) => {
    eventClassRegistry[target.name] = target;
  };
}
