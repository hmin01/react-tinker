export function InfoWindow() {
  return (
    <div className="absolute top-4 left-4 z-50 w-68 rounded-xl border border-gray-200 px-4 py-3 shadow-md">
      <h3 className="mb-1.5 text-lg font-bold">How to use</h3>
      <ol className="list-decimal pl-5 text-sm">
        <li>Click and drag to draw a shape.</li>
        <li>Right-click to remove a point.</li>
        <li>Double-click to complete the shape.</li>
      </ol>
    </div>
  );
}
