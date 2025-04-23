import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
  import { DashboardLayoutProps } from "@/lib/types/types"
  import { ChevronRight } from "lucide-react"
  
  const DashboardLayout = ({ current,link,linkName,secondLink,secondLinkName }: DashboardLayoutProps) => {
    return (
      <div className="w-full bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4">
            {/* Breadcrumb Navigation */}
            <div className="mb-4 md:mb-0">
              <Breadcrumb>
                <BreadcrumbList className="flex items-center space-x-2 text-sm">
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href="/Login"
                      className="text-gray-500 hover:text-gray-700 transition-colors font-medium"
                    >
                      Login
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href={`/${link}`}
                      className="text-gray-500 hover:text-gray-700 transition-colors font-medium"
                    >
                      {linkName}
                    </BreadcrumbLink>
                    <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </BreadcrumbSeparator>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href={`/${secondLink}`}
                      className="text-gray-500 hover:text-gray-700 transition-colors font-medium"
                    >
                      {secondLinkName}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <span className="text-gray-700 font-semibold">{current}</span>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              
              {/* Page Title */}
              <h1 className="text-2xl font-bold text-gray-900 mt-2">{current}</h1>
            </div>
  
            {/* Dashboard Controls (optional) */}
          </div>
        </div>
      </div>
    )
  }
  
  export default DashboardLayout