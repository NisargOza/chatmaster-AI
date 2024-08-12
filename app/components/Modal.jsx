export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="flex flex-col rounded-md border-4 border-gray-500 bg-[#0f1722] p-4">
        <div className="flex w-full justify-end">
          <button
            onClick={onClose}
            className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-center text-black hover:bg-gray-400"
          >
            X
          </button>
        </div>
        <div className="rounded-lg p-6">{children}</div>
      </div>
    </div>
  );
}
