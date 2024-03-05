interface HeaderProps {
    children: React.ReactNode
}

const Header = ({children}: HeaderProps) => {
    return (
        <h2 className="scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0">
            {children}
        </h2>
    );
};

interface DescriptionProps {
    children: React.ReactNode
}

const Description = ({children}: DescriptionProps) => {
    return (
        <p className="text-xl pt-5 pb-10 text-muted-foreground">
            {children}
        </p>
    );
};


export {Header, Description}
