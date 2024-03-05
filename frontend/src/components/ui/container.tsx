interface ContainerProps {
    children: React.ReactNode
}

const Container = ({children}: ContainerProps) => {
    return (
        <div className="w-4/5 mx-auto mt-16">
            {children}
        </div>
    );
};

export {Container};