import { getSolutionExplorerServer } from './CrossNavUtils';
 
describe('CrossNavUtils tests', () => {
    beforeEach(() => {
        //Reset window.location.href
        delete (global as any).window;
    })

    test('getSolutionExplorerServer https://localhost', () => {       
        (global as any).window = Object.create({location: {href: 'https://localhost'}});
        const result = getSolutionExplorerServer();
        expect(result).toBe('https://solution-explorer');
    })

    test('getSolutionExplorerServer https://application1.apps.example.com/', () => {       
        (global as any).window = Object.create({location: {href: 'https://application1.apps.example.com/'}});
        const result = getSolutionExplorerServer();
        expect(result).toBe('https://solution-explorer.apps.example.com');
    })

    test('getSolutionExplorerServer https://application1.apps.example.com', () => {       
        (global as any).window = Object.create({location: {href: 'https://application1.apps.example.com'}});
        const result = getSolutionExplorerServer();
        expect(result).toBe('https://solution-explorer.apps.example.com');
    })

    test('getSolutionExplorerServer https://application1.apps.example.com/path/example.html', () => {       
        (global as any).window = Object.create({location: {href: 'https://application1.apps.example.com/path/example.html'}});
        const result = getSolutionExplorerServer();
        expect(result).toBe('https://solution-explorer.apps.example.com');
    })

    test('getSolutionExplorerServer https://application1.apps.example.com/path/example.html?test=one&test2=two', () => {       
        (global as any).window = Object.create({location: {href: 'https://application1.apps.example.com/path/example.html?test=one&test2=two'}});
        const result = getSolutionExplorerServer();
        expect(result).toBe('https://solution-explorer.apps.example.com');
    })

    test('getSolutionExplorerServer https://application1.apps.example.com/index.html?test=one&test2=two', () => {       
        (global as any).window = Object.create({location: {href: 'https://application1.apps.example.com/index.html?test=one&test2=two'}});
        const result = getSolutionExplorerServer();
        expect(result).toBe('https://solution-explorer.apps.example.com');
    })
});