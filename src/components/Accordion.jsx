const AccordionItem = ({ title, content, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-200">
            <button
                className={`flex justify-between items-center w-full mt-4 p-4 px-10 text-left focus:outline-none rounded-xl ${isOpen ? 'bg-primary1 text-white rounded-b-none' : 'bg-[#F8F8F8] text-gray-800'}`}
                onClick={onClick}
            >
                <span className="font-[600] text-[18px]">{title}</span>
                <span>{isOpen ? '-' : '+'}</span>
            </button>
            {isOpen && (
                <div className="px-4 pb-2 bg-primary1 rounded-b-xl ">
                    <p className="text-white text-[15px] font-[300] max-w-[930.765px]  pl-5">{content}</p>
                </div>
            )}
        </div>
    );
};
export default AccordionItem;