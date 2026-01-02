import { Body } from '@/components/homepage/Body';
import { Footer } from '@/components/homepage/Footer';
import { Header } from '@/components/homepage/Header';

export default function Home() {
    return (
        <>
            <Header />
            <main>
                <Body />
            </main>
            <Footer />
        </>
    );
}
