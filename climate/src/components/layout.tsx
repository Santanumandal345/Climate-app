import React, { type PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div className='bg-gradient-to-br from-background to-muted'>
            <header>
                <h1 className="text-3xl font-bold">Climate App</h1>
            </header>
            <main className="min-h-screen container mx-auto px-4 py-8"> {children}

              </main>


            <footer className='border-t border-blur py-12 supports-[backdrop-filter]:bg-background/60'>
                <div className='container mx-auto px-4 text-center text-gray-400'>{children}</div>
                <p className="text-sm">© 2025 Climate App. All rights

                    reserved.</p>


            </footer>
        </div>
    )
}

export default Layout


  
