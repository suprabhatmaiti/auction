import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CgBell } from 'react-icons/cg';
import NotificationPanel from './NotificationPanel';
import QuickActionButtons from './QuickActionButtons';
import QuickLinksPanel from './QuickLinksPanel';
import OverviewPanel from './OverviewPanel';

function DashboardPage() {
  const navigate = useNavigate();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleAddAuctionClick = () => navigate('/add-auction');
  const handleAuctionListClick = () => navigate('/auction-list');

  return (
    <div className="min-h-screen bg-gray-100 pt-8 px-4 md:px-12 flex flex-col lg:flex-row gap-8 relative">
      {/* Left section */}
      <div className="w-full lg:w-3/5">
        <h2 className="text-3xl font-bold mb-6 lg:text-left">Dashboard</h2>

        <div className="mb-10">
          <h2 className="text-xl font-medium mb-4">Overview</h2>
          <OverviewPanel />
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-medium mb-4">Quick Links</h2>
          <QuickLinksPanel
            onlistNewItem={handleAddAuctionClick}
            onViewActiveBids={handleAuctionListClick}
          />
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-medium mb-4">Quick Actions</h2>
          <QuickActionButtons
            onListAuction={handleAddAuctionClick}
            onBidPlace={handleAuctionListClick}
          />
        </div>
      </div>

      {/* Right section (hidden on small screens) */}
      <div className="hidden lg:block w-1/3">
        <NotificationPanel />
      </div>

      {/* Floating Bell Icon (visible only on small screens) */}
      <button
        className="lg:hidden fixed bottom-6 right-6 bg-violet-600 text-white p-4 rounded-full shadow-lg hover:bg-violet-700 transition"
        onClick={() => setIsNotificationOpen(true)}
      >
        <CgBell size={24} />
      </button>

      {/* Mobile Notification Drawer */}
      {isNotificationOpen && (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-end z-50">
          <div className="bg-white w-4/5 sm:w-2/3 h-full shadow-lg p-4 transform transition-transform duration-300 translate-x-0">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Notifications</h2>
              <button
                onClick={() => setIsNotificationOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>
            <NotificationPanel isMobile />
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
