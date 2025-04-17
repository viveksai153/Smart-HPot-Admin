import * as SelectPrimitive from '@radix-ui/react-select';

const Select = ({ value, onValueChange, children, className }) => {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger className={className}>
        {value}
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Content>
        {children}
      </SelectPrimitive.Content>
    </SelectPrimitive.Root>
  );
};

const SelectItem = ({ value, children }) => {
  return (
    <SelectPrimitive.Item value={value}>
      {children}
    </SelectPrimitive.Item>
  );
};

export { Select, SelectItem };
