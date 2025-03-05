import Select from "../../../components/Select";
import { SelectOption } from "../../../types";

type Props = {
  value: string;
  onChange: (value: any) => void;
}

const ViewModeSelect = (props: Props) => {
  const {value, onChange} = props;

  const viewModeOptions: SelectOption[] = [
    {
      label: "Show All",
      value: "all"
    },
    {
      label: "Missing",
      value: "missing"
    },
    {
      label: "Japanese",
      value: "apanese"
    },
  ];

  return (
    <Select
      className="view-mode"
      options={viewModeOptions}
      value={value}
      onChange={onChange}
    />
  )
}

export default ViewModeSelect;