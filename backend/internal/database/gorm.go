package database

import (
	"database/sql"
	"fmt"
	"time"

	"v-park/config"

	_ "github.com/go-sql-driver/mysql"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/schema"
)

func DatabaseConnect() (*gorm.DB, error) {

	cfg := config.DatabaseConfig()

	if cfg.User == "" || cfg.Password == "" || cfg.Host == "" || cfg.Name == "" {
		err := fmt.Errorf("missing database env vars")
		return nil, err
	}

	// Koneksi ke server tanpa memilih database
	dbRaw, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%d)/", cfg.User, cfg.Password, cfg.Host, cfg.Port))
	if err == nil {
		// Buat database jika belum ada (menggunakan MYSQL_DB / cfg.Name)
		_, _ = dbRaw.Exec(fmt.Sprintf("CREATE DATABASE IF NOT EXISTS `%s` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci", cfg.Name))
		dbRaw.Close()
	}

	dsn := fmt.Sprintf(
		"%s:%s@tcp(%s:%d)/%s"+
			"?parseTime=true"+
			"&charset=utf8mb4"+
			"&collation=utf8mb4_unicode_ci"+
			"&loc=Local"+
			"&multiStatements=true",
		cfg.User,
		cfg.Password,
		cfg.Host,
		cfg.Port,
		cfg.Name,
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		NamingStrategy: schema.NamingStrategy{SingularTable: true},
	})
	if err != nil {
		return nil, err
	}

	// Connection Pool - backend/main.go
	sqlDB, err := db.DB()
	if err == nil {
		sqlDB.SetMaxOpenConns(30)
		sqlDB.SetMaxIdleConns(5)
		sqlDB.SetConnMaxLifetime(5 * time.Minute)
	}

	return db, nil
}
