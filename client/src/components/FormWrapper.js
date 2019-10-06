import styled from 'styled-components'

export const FormWrapper = styled.form`
.card {
  border-color: transparent;
  transition: all 1s linear;
  overflow-x: auto;
}
.card-text {
  font-size: 1.1rem;
}
&:hover {
  .card {
    border: 0.04rem solid rgba(0, 0, 0, 0.2);
    box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
  }
}
`;