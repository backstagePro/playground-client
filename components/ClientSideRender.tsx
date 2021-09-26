
interface IProps {
  children: any;
}

const ClientSideRenderer: React.FC<IProps> = ({ children }) => {
    
  return typeof window !== 'undefined'  ?  children : null;
}

export default ClientSideRenderer;