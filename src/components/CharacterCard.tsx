import { memo, VFC } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import Card from './Card';

const Wrapper = styled(Card)`
  position: relative;
  width: 300px;
  background: #484e5b;
  overflow: hidden;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.2) 0px 3px 3px -2px,
    rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;

  .id {
    position: absolute;
    top: 8px;
    left: 8px;
    color: white;
    font-size: 21px;
    font-weight: bold;
    text-shadow: 1px 1px #a9a0a0;
    opacity: 0.9;
  }

  img {
    width: 100%;
  }

  .details {
    position: relative;

    .character-name {
      position: absolute;
      top: 0;
      width: 100%;
      padding: 6px 12px;
      margin: 0;
      font-size: 18px;
      color: ${darken(0.15, '#fff')};
      background: #282c34;
      transform: translate(0, -100%);
      opacity: 0.7;
    }
  }
` as any;

const DetailsList = styled.div`
  padding: 6px 12px;

  .details-list--item {
    display: flex;
    justify-content: space-between;
    font-size: 12px;

    :not(:last-child) {
      margin-bottom: 6px;
    }

    .item-label {
      width: 70px;
      margin-right: 18px;
      text-transform: uppercase;
    }

    .item-value {
      display: flex;
      align-items: center;
      text-align: right;
      color: var(--accent-color);
    }
  }
`;

type InfoItemProps = {
  label: string;
  value: string;
}

const InfoItem: VFC<InfoItemProps> = ({ label, value }) => (
  <div className="details-list--item">
    <span className="item-label">{label}</span>
    <span className="item-value">{value}</span>
  </div>
);

type CharacterDto = {
  status: string;
  species: string;
  gender: string;
  origin?: {
    name: string;
  };
  location: {
    name: string;
  };
  id: string;
  image: string;
  name: string;
}

type CharacterProps = {
  data: CharacterDto;
  imgComponent?: any;
}

const Character: VFC<CharacterProps> = ({ data, imgComponent: Img = "img" }) => {
  const details = [
    ['status', data.status],
    ['species', data.species],
    ['gender', data.gender],
    ['origin', data.origin ? data.origin.name : 'Unknown'],
    ['last location', data.location ? data.location.name : 'Unknown'],
  ];

  return (
    <Wrapper>
      <span className="id">#{data.id}</span>
      <Img src={data.image} alt={data.name} />
      <div className="details">
        <h6 className="character-name">{data.name}</h6>
        <DetailsList>
          {details.map(item => {
            const [label, value] = item;
            return <InfoItem key={label} label={label} value={value} />;
          })}
        </DetailsList>
      </div>
    </Wrapper>
  );
};

export default memo(Character);
