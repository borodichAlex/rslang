import baseUrl from './baseUrl';

const getData = async (id: string) => {
    const res = await fetch(`${baseUrl}/words/${id}`);
    return res.json();
};

export default getData;
