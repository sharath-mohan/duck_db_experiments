import duckdb

class DuckDB:
    def __init__(self):
        self.con = duckdb.connect(database=":memory:", read_only=False)
    def install_httpfs(self):
        print("Installing httpfs...")
        self.con.execute("INSTALL httpfs;")
        self.con.execute("LOAD httpfs;")
        print("httpfs installed successfully")
    def read_parquet(self, path: str):
        return self.con.execute(f"SELECT * FROM read_parquet('{path}');").fetchone()


def main():
    db = DuckDB()
    db.install_httpfs()
    data = db.read_parquet("http://localhost:3000/get-data")
    print(data)
    


if __name__ == "__main__":
    main()
