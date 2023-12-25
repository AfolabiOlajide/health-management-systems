import { Poppins } from 'next/font/google'

const font = Poppins({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })


const GlobalFont = ({children}: {children: React.ReactNode}) => {
    return (
        <div className={`${font.className}`}>{children}</div>
    )
}

export default GlobalFont