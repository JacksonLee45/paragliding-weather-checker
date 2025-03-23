// src/components/ui/tabs.jsx
import * as React from "react";

const Tabs = React.forwardRef(({ className, value, onValueChange, ...props }, ref) => {
  // Track which tab is active internally
  const [activeTab, setActiveTab] = React.useState(value);
  
  // Sync with external state when value changes
  React.useEffect(() => {
    if (value !== activeTab) {
      setActiveTab(value);
    }
  }, [value]);

  // Provide context for child components
  const contextValue = React.useMemo(() => ({
    value: activeTab,
    onValueChange: (newValue) => {
      setActiveTab(newValue);
      if (onValueChange) {
        onValueChange(newValue);
      }
    }
  }), [activeTab, onValueChange]);

  return (
    <TabsContext.Provider value={contextValue}>
      <div
        ref={ref}
        className={className}
        {...props}
      />
    </TabsContext.Provider>
  );
});
Tabs.displayName = "Tabs";

// Create a context to manage active tab state
const TabsContext = React.createContext(null);

const useTabsContext = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs component");
  }
  return context;
};

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="tablist"
    className={`inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground ${className || ""}`}
    {...props}
  />
));
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef(({ className, value, ...props }, ref) => {
  const { value: selectedValue, onValueChange } = useTabsContext();
  const isActive = selectedValue === value;
  
  return (
    <button
      ref={ref}
      role="tab"
      type="button"
      aria-selected={isActive}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        isActive 
          ? "bg-background text-foreground shadow" 
          : "hover:bg-background/50 hover:text-foreground"
      } ${className || ""}`}
      onClick={() => onValueChange(value)}
      data-state={isActive ? "active" : "inactive"}
      {...props}
    />
  );
});
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef(({ className, value, forceMount, ...props }, ref) => {
  const { value: selectedValue } = useTabsContext();
  const isActive = selectedValue === value;
  
  if (!forceMount && !isActive) {
    return null;
  }
  
  return (
    <div
      ref={ref}
      role="tabpanel"
      className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
        isActive ? "block animate-in fade-in-0 zoom-in-95" : "hidden"
      } ${className || ""}`}
      data-state={isActive ? "active" : "inactive"}
      {...props}
    />
  );
});
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };