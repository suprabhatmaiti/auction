import { RiAuctionLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

function LogoSection() {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate('/')} className="flex items-center gap-4 cursor-pointer">
      <RiAuctionLine className="size-8 " />
      <h3 className="font-bold text-lg w-full">Auction Central</h3>
    </div>
  );
}

export default LogoSection;
