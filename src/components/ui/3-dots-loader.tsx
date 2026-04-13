export const ThreeDotsLoader = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Circular spinner */}
      <div className="loading-spinner" />
      {/* Loading text */}
      <p className="text-sm font-medium text-muted-foreground animate-pulse tracking-wide">
        Loading...
      </p>
    </div>
  );
};
