import React, { useContext } from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Context from './context';

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  // {...props}

  const { value } = props;
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">
          {`${Math.round(value)}`}
        </Typography>
      </Box>
    </Box>
  );
}

export default function Timer() {
  const [progress, setProgress] = React.useState(100);
  const [isGameOver, setIsGameOver]: any = useContext(Context);
  if (!progress) {
    setIsGameOver(!isGameOver);
  }

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 1 ? prevProgress - 1 : 0));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <CircularProgressWithLabel value={progress} />;
}
