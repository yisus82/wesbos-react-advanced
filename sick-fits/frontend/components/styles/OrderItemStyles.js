import styled from 'styled-components';

const OrderItemStyles = styled.li`
  box-shadow: var(--bs);
  list-style: none;
  padding: 2rem;
  border: 1px solid var(--offWhite);
  h2 {
    border-bottom: 2px solid red;
    margin-top: 0;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }
  a {
    display: block;
    text-align: center;
    margin: 1.5rem 0;
    background-color: var(--lightGray);
  }
  .images {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 1rem;
    img {
      max-height: 150px;
      object-fit: contain;
      max-width: 150px;
      margin: 1rem;
    }
  }
  .order-meta {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20px, 1fr));
    display: grid;
    grid-gap: 1rem;
    text-align: center;
    & > * {
      margin: 0;
      background: rgba(0, 0, 0, 0.03);
      padding: 1rem 0;
    }
    strong {
      display: block;
      margin-bottom: 1rem;
    }
  }
`;

export default OrderItemStyles;
