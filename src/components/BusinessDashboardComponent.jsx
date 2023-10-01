import BusinessCurrentApplicationsComponent from './BusinessCurrentApplicationsComponent'

export default function BusinessDashboardComponent() {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        <div className="py-10">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Dashboard</h1>
              <BusinessCurrentApplicationsComponent />
            </div>
          </header>
        </div>
      </div>
    </>
  )
}
