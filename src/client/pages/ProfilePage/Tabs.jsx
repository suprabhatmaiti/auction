function Tabs({ activeTab, setActiveTab,tabs }){
    const RenderedTabs = tabs.map((tab)=>{
                return(
                    <button
                        className={`px-4 py-2 -mb-px font-semibold border-b-2 cursor-pointer ${
                        activeTab === tab.id
                            ? "border-violet-500 text-violet-500"
                            : "border-transparent text-gray-600 hover:text-violet-500"
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                )
            })


    return(
        <div className="flex border-b border-gray-200 mb-6">
            {RenderedTabs}
        </div>
    )
}

export default Tabs;