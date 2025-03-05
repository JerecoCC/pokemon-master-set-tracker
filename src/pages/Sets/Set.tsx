import { useNavigate } from "react-router";
import { SetType } from "../../types";
import useCards from "../../hooks/useCards";
import CardProgress from "../../components/CardProgress";

type Props = {
  data: SetType;
}

const Set = (props: Props) => {
  const {data} = props;
  const navigate = useNavigate();

  const {data: [cards]} = useCards(data.id || "", data.ptcgoCode);
  return (
    <div
      className="set"
      key={data.id}
      onClick={() => {
        navigate(data.ptcgoCode);
      }}
    >
      <p className="set-symbol">{data.ptcgoCode}</p>
      <img className="set-logo" src={data.images.logo} />
      <b>{data.name} ({cards.length})</b>
      <CardProgress data={cards} />
    </div>
  );
}

export default Set;