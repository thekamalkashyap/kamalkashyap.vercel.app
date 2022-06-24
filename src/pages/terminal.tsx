import React from 'react';
import { Input } from '../components/input';
import { useHistory } from '../components/history/hook';
import { History } from '../components/history/History';
import { banner } from '../utils/bin';

interface TerminalPageProps {
  inputRef: React.MutableRefObject<HTMLInputElement>;
}

const Terminal: React.FC<TerminalPageProps> = ({ inputRef }) => {
  const onClickAnywhere = () => {
    inputRef.current.focus();
  };

  const containerRef = React.useRef(null);
  const {
    history,
    command,
    lastCommandIndex,
    setCommand,
    setHistory,
    clearHistory,
    setLastCommandIndex,
  } = useHistory([]);

  const init = React.useCallback(() => setHistory(banner()), []);

  React.useEffect(() => {
    init();
  }, [init]);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView();
      inputRef.current.focus({ preventScroll: true });
    }
  }, [history]);

  return (
    <>
      <main
        ref={containerRef}
        className="min-h-[100vh] p-6 overflow-scroll text-[0.5rem] sm:text-xs lg:text-sm xl:text-base"
        onClick={onClickAnywhere}
      >
        <History history={history} />

        <Input
          inputRef={inputRef}
          containerRef={containerRef}
          command={command}
          history={history}
          lastCommandIndex={lastCommandIndex}
          setCommand={setCommand}
          setHistory={setHistory}
          setLastCommandIndex={setLastCommandIndex}
          clearHistory={clearHistory}
        />
      </main>
    </>
  );
};

export default Terminal;