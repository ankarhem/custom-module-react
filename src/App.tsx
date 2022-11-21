import { MountProps } from './module';

function App(props: MountProps) {
  console.log(props);
  return <div>hello from react</div>;
}

export default App;
