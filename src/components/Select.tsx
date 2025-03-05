import { SelectOption } from "../types";

type Props = {
  className?: string;
  options: SelectOption[];
  value: string | number;
  onChange: (value: any) => void;
}

const Select = (props: Props) => {
  const {className, options, value, onChange} = props;
  return (
    <select 
      className={className}
      value={value} 
      onChange={(e) => onChange(e.currentTarget.value)}
    >
      {options.map((option: SelectOption) => (
        <option 
          key={`option-${option.value}`}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default Select;