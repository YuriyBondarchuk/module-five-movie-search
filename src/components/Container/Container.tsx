function Container({children, classAdd}: {children: any, classAdd?: string}) {
    return (
        <div className={classAdd ? classAdd + " container" : "container"}>{children}</div>
    );
}

export default Container;