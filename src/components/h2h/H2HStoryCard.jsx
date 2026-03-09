export default function H2HStoryCard({ item, onClick }) {

  return (
    <div className="h2h-card" onClick={onClick}>
      <div className="h2h-card-title">{item.title}</div>
      <div className="h2h-card-category">{item.category}</div>
      <div className="h2h-card-pulse" />
    </div>
  );
}