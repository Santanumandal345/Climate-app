// import React, { type PropsWithChildren } from 'react'

// const Layout = ({ children }: PropsWithChildren) => {
//     return (
//         <div className='bg-gradient-to-br from-background to-muted'>
//             <header>
//                 <div className='container mx-auto px-4 py-4'>
//                     <h1 className='text-2xl font-bold text-center'>Climate App</h1>
//                 </div>
//             </header>
//             <main className="min-h-screen container mx-auto px-4 py-8"> {children}

//               </main>


//             <footer className='border-t border-blur py-12 supports-[backdrop-filter]:bg-background/60'>
//                 <div className='container mx-auto px-4 text-center text-gray-400'>{children}</div>
//                 <p className="text-sm">© 2025 Climate App. All rights

//                     reserved.</p>


//             </footer>
//         </div>
//     )
// }

// export default Layout




// import React, { type PropsWithChildren } from 'react'

// const Layout = ({ children }: PropsWithChildren) => {
//   return (
//     <div className="bg-gradient-to-br from-background to-muted">
//       <header>
//         <div className="container mx-auto px-4 py-4">
//           <h1 className="text-2xl font-bold text-center">Climate App</h1>
//         </div>
//       </header>

//       <main className="min-h-screen container mx-auto px-4 py-8">
//         {children}
//       </main>

//       <footer className="border-t border-blur py-12 supports-[backdrop-filter]:bg-background/60">
//         <div className="container mx-auto px-4 text-center text-gray-400">
//           <p className="text-sm">© 2025 Climate App. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Layout;

import Header from "@/components/header";
// matches file name exactly
  import React, { type PropsWithChildren } from "react";
 // matches file name exactly

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
      <Header /> {/* Logo header */}
      <main className="min-h-screen container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t border-blur py-12 supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 text-center text-gray-400">
          © 2025 Climate App. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
