const Button = styled.button`
  background: ${props => props.theme.colors.primary};
  box-shadow: ${props => props.theme.shadows.primary};
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primaryLight};
    box-shadow: ${props => props.theme.shadows.hover};
    transform: translateY(-1px);
  }
`
