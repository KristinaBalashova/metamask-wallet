
import WalletCard from './WalletCard';
import { Box } from '@mui/material';


export default function MainSection() {
  return (
    <Box component='section' sx={{
      display: 'flex',
      justifyContent: 'center',
    }}>
      <WalletCard />
    </Box>
  );
}
