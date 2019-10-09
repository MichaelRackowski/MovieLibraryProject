namespace WebAPISample.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class removaloftest : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Movies", "Test");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Movies", "Test", c => c.String());
        }
    }
}
