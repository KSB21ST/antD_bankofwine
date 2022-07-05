import Deposit from '@/pages/Balance/components/deposit';
import Withdraw from '@/pages/Balance/components/withdraw';
import { Box, Button } from '@mui/material';
import { useState } from 'react';

export const Dashboard = () => {
  const [selectDeposit, setDeposit] = useState(true);

  const handleChange = () => {
    if (selectDeposit) {
      setDeposit(false);
    } else {
      setDeposit(true);
    }
  };

  return (
    <div>
      {selectDeposit && (
        <Box sx={{ width: '100%', p: 2 }}>
          <Button onClick={handleChange} variant="contained" disableElevation>
            View Withdraw
          </Button>
          <Box sx={{ width: '100%', p: 1 }}>
            예치금 입금 신청 목록입니다. 신한은행 100-035-890450 (블링커스 주식회사) 계좌에서
            신청인과
            <div>
              입금자명을 비교하신 후 맞으면 확인을 눌러주세요. 확인을 눌러주시면 예치금 충전이
              완료됩니다
            </div>
          </Box>
        </Box>
      )}
      {!selectDeposit && (
        <Box sx={{ width: '100%', p: 2 }}>
          <Button onClick={handleChange} variant="contained" style={{ backgroundColor: '#CA0000' }}>
            View Deposit
          </Button>
          <Box sx={{ width: '100%', p: 1 }}>
            예치금 출금 신청 목록입니다. 계좌번호를 확인 후 예금주명이 신청인과 일치하는지 확인
            부탁드립니다.
            <div>
              *일치한다면 신청자에게 해당 금액을 입금 후 확인 버튼을 눌러주세요. 출금 신청이
              완료됩니다.
            </div>
            <div>*일치하지 않는다면 취소 버튼을 눌러주시면 출금 신청이 신청자에게 반려됩니다.</div>
          </Box>
        </Box>
      )}
      {selectDeposit && <Deposit />}
      {!selectDeposit && <Withdraw />}
    </div>
  );
};
export default Dashboard;
