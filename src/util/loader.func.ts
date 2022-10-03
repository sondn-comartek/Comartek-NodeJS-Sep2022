exports.mapFromArray = (objs, ids) => {
    return ids.map(
        (id) =>
            objs.filter((obj: any) => obj.id === id) || null,
    );
}

