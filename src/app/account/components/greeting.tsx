const Greeting = ({ user }: { user: any }) => {
    return (
        <div className="flex flex-col gap-1 mb-8">
            <h1 className="text-2xl">Hello,
                {user?.displayName?.split(' ')[0]} 👋</h1>
            <p className="text-grayth text-sm">{user.email}</p>
        </div>
    );
}

export default Greeting;