import React, { useState, useEffect } from 'react';

const flashcardData = [
  // SECTION 1: Implement and manage an analytics solution (30-35%)
  // Configure Microsoft Fabric workspace settings
  {
    id: 1,
    category: "Workspace Settings",
    section: "Implement & Manage",
    question: "What are the four main workspace settings you can configure in Microsoft Fabric?",
    answer: "1. Spark workspace settings\n2. Domain workspace settings\n3. OneLake workspace settings\n4. Data workflow workspace settings"
  },
  {
    id: 2,
    category: "Workspace Settings",
    section: "Implement & Manage",
    question: "What can you configure in Spark workspace settings?",
    answer: "• Default Spark pool configurations\n• Library management (Python, R, JAR packages)\n• Spark session timeouts\n• Automatic core and memory allocation\n• Environment configurations\n• High concurrency mode settings"
  },
  {
    id: 3,
    category: "Workspace Settings",
    section: "Implement & Manage",
    question: "What are Domain workspace settings used for?",
    answer: "Domains help organize workspaces by business area. You can:\n• Group related workspaces under a domain\n• Apply consistent governance policies\n• Enable domain-level administration\n• Set domain-specific default settings\n• Facilitate data discovery across the organization"
  },
  {
    id: 4,
    category: "Workspace Settings",
    section: "Implement & Manage",
    question: "What are OneLake workspace settings?",
    answer: "OneLake settings control:\n• Data residency and storage location\n• Shortcut creation permissions\n• External data sharing policies\n• ADLS Gen2 connectivity\n• Delta format configurations\n• Cache settings for improved performance"
  },
  {
    id: 5,
    category: "Workspace Settings",
    section: "Implement & Manage",
    question: "What are Data workflow workspace settings?",
    answer: "Data workflow settings manage:\n• Apache Airflow integration\n• DAG (Directed Acyclic Graph) configurations\n• Workflow scheduling options\n• Git integration for workflows\n• Connection and secret management"
  },
  
  // Lifecycle Management
  {
    id: 6,
    category: "Lifecycle Management",
    section: "Implement & Manage",
    question: "What are the three key components of lifecycle management in Fabric?",
    answer: "1. Version control (Git integration)\n2. Database projects\n3. Deployment pipelines"
  },
  {
    id: 7,
    category: "Lifecycle Management",
    section: "Implement & Manage",
    question: "How do you configure version control in Microsoft Fabric?",
    answer: "• Connect workspace to Azure DevOps or GitHub\n• Configure Git credentials\n• Set branch policies\n• Define sync direction\n• Map workspace items to repository folders\n• Configure conflict resolution policies"
  },
  {
    id: 8,
    category: "Lifecycle Management",
    section: "Implement & Manage",
    question: "What are database projects in Fabric?",
    answer: "Database projects enable:\n• Schema-as-code for data warehouses\n• Declarative database development\n• Schema comparison and deployment\n• Version control of database objects\n• CI/CD integration for DW changes\n• SQL projects (.sqlproj) support"
  },
  {
    id: 9,
    category: "Lifecycle Management",
    section: "Implement & Manage",
    question: "What are deployment pipelines and their stages?",
    answer: "Deployment pipelines move content between environments:\n\nDefault stages:\n• Development\n• Test\n• Production\n\nFeatures:\n• Automated deployments\n• Deployment rules for environment-specific settings\n• Comparison between stages\n• Selective item deployment"
  },
  {
    id: 10,
    category: "Lifecycle Management",
    section: "Implement & Manage",
    question: "What deployment rules can you configure in deployment pipelines?",
    answer: "Deployment rules allow you to:\n• Change data source connections per stage\n• Update parameter values\n• Modify connection strings\n• Set different capacity assignments\n• Configure environment-specific behaviors"
  },
  
  // Security and Governance
  {
    id: 11,
    category: "Security & Governance",
    section: "Implement & Manage",
    question: "What are the workspace-level access control roles in Fabric?",
    answer: "Four workspace roles:\n\n• Admin: Full control, manage users, delete workspace\n• Member: Create/edit content, publish apps\n• Contributor: Create/edit content, cannot publish\n• Viewer: View content only, cannot edit"
  },
  {
    id: 12,
    category: "Security & Governance",
    section: "Implement & Manage",
    question: "What item-level access controls are available in Fabric?",
    answer: "• Share individual items with specific users\n• Grant Read, ReadAll, or Build permissions\n• Configure per-item sharing links\n• Set item-specific permissions independent of workspace role\n• Lakehouse table-level permissions"
  },
  {
    id: 13,
    category: "Security & Governance",
    section: "Implement & Manage",
    question: "What is Row-Level Security (RLS) in Fabric?",
    answer: "RLS restricts data access at the row level:\n\n• Define security roles with DAX filters\n• Assign users/groups to roles\n• Filters apply automatically to queries\n• Works in semantic models and Direct Lake\n• Example: Sales reps see only their region's data"
  },
  {
    id: 14,
    category: "Security & Governance",
    section: "Implement & Manage",
    question: "What is Column-Level Security (CLS)?",
    answer: "CLS restricts access to specific columns:\n\n• Hide sensitive columns from unauthorized users\n• Apply at warehouse/lakehouse level\n• Use GRANT/DENY on column permissions\n• Combine with RLS for comprehensive security\n• Example: Hide salary column from non-HR users"
  },
  {
    id: 15,
    category: "Security & Governance",
    section: "Implement & Manage",
    question: "What is Object-Level Security (OLS)?",
    answer: "OLS hides entire tables or columns in semantic models:\n\n• Define in Tabular Model Definition Language (TMDL)\n• Assign users to security roles\n• Hidden objects are invisible to unauthorized users\n• Differs from CLS: completely hides vs. denies access\n• Configured through Tabular Editor or XMLA"
  },
  {
    id: 16,
    category: "Security & Governance",
    section: "Implement & Manage",
    question: "How do you implement folder/file-level access controls?",
    answer: "In OneLake:\n• Assign permissions at folder level\n• Use Azure AD groups for management\n• Permissions inherit to subfolders/files\n• Override inheritance where needed\n• Configure via OneLake File Explorer or APIs"
  },
  {
    id: 17,
    category: "Security & Governance",
    section: "Implement & Manage",
    question: "What is Dynamic Data Masking in Fabric?",
    answer: "DDM obscures sensitive data in query results:\n\nMask types:\n• Default: Full masking based on data type\n• Email: Shows first letter and domain\n• Random: Number within specified range\n• Custom: Configurable prefix/suffix\n\nAuthorized users see unmasked data."
  },
  {
    id: 18,
    category: "Security & Governance",
    section: "Implement & Manage",
    question: "What are sensitivity labels in Fabric?",
    answer: "Microsoft Purview sensitivity labels:\n\n• Classify data by sensitivity (Public, Internal, Confidential)\n• Apply to Fabric items and content\n• Labels flow with data across exports\n• Enable encryption and protection policies\n• Integrate with DLP policies\n• Required: Microsoft Purview license"
  },
  {
    id: 19,
    category: "Security & Governance",
    section: "Implement & Manage",
    question: "What does it mean to 'endorse' items in Fabric?",
    answer: "Endorsement indicates trustworthiness:\n\nTwo levels:\n• Promoted: Identified as valuable, production-ready\n• Certified: Meets organizational quality standards\n\nBenefits:\n• Visible badge on items\n• Improved discoverability\n• Only admins can certify"
  },
  {
    id: 20,
    category: "Security & Governance",
    section: "Implement & Manage",
    question: "What is workspace logging in Fabric?",
    answer: "Workspace logging captures audit events:\n\n• User activities (views, edits, deletes)\n• Administrative actions\n• Data access events\n• Integration with Azure Monitor\n• Export to Log Analytics workspace\n• Retention and analysis capabilities"
  },
  
  // Orchestration
  {
    id: 21,
    category: "Orchestration",
    section: "Implement & Manage",
    question: "When should you use a pipeline vs. a notebook for orchestration?",
    answer: "Use Pipeline when:\n• Orchestrating multiple activities\n• Need visual workflow designer\n• Copying data between sources\n• Scheduling multiple notebooks\n• Need conditional logic (If/ForEach)\n\nUse Notebook when:\n• Complex data transformations\n• Interactive development needed\n• Heavy PySpark processing\n• ML model training/inference"
  },
  {
    id: 22,
    category: "Orchestration",
    section: "Implement & Manage",
    question: "What trigger types are available for pipelines?",
    answer: "Schedule triggers:\n• Time-based (hourly, daily, weekly, etc.)\n• Cron expressions\n• Recurring patterns\n\nEvent-based triggers:\n• Storage events (blob created/deleted)\n• Custom events via Event Grid\n• On-demand/manual execution"
  },
  {
    id: 23,
    category: "Orchestration",
    section: "Implement & Manage",
    question: "What are pipeline parameters and dynamic expressions?",
    answer: "Parameters:\n• Define at pipeline level\n• Pass values at runtime\n• Support default values\n\nDynamic expressions:\n• @pipeline().RunId\n• @utcnow()\n• @concat(), @if(), @coalesce()\n• @activity('name').output\n• Enable runtime flexibility"
  },
  {
    id: 24,
    category: "Orchestration",
    section: "Implement & Manage",
    question: "What orchestration patterns can you implement with notebooks?",
    answer: "• Master notebook calling child notebooks\n• %run magic command for sequential execution\n• mssparkutils.notebook.run() for parallel execution\n• Parameter passing between notebooks\n• Exit values for conditional logic\n• Notebook reference activities in pipelines"
  },

  // SECTION 2: Ingest and transform data (30-35%)
  // Loading Patterns
  {
    id: 25,
    category: "Loading Patterns",
    section: "Ingest & Transform",
    question: "What is the difference between full load and incremental load?",
    answer: "Full Load:\n• Loads entire dataset each time\n• Simple to implement\n• Higher resource consumption\n• Good for small datasets or complete refreshes\n\nIncremental Load:\n• Loads only new/changed data\n• Uses watermarks or change tracking\n• More efficient for large datasets\n• Requires change detection mechanism"
  },
  {
    id: 26,
    category: "Loading Patterns",
    section: "Ingest & Transform",
    question: "What techniques enable incremental data loading?",
    answer: "• High watermark columns (modified date, ID)\n• Change Data Capture (CDC)\n• Change Tracking\n• Delta Lake time travel\n• Merge operations (UPSERT)\n• Partition-based loading\n• Tumbling window triggers"
  },
  {
    id: 27,
    category: "Loading Patterns",
    section: "Ingest & Transform",
    question: "How do you prepare data for loading into a dimensional model?",
    answer: "Steps:\n1. Identify dimensions and facts\n2. Create surrogate keys for dimensions\n3. Handle Slowly Changing Dimensions (SCD)\n4. Derive date/time dimensions\n5. Denormalize for star schema\n6. Calculate aggregates for facts\n7. Handle NULL values\n8. Validate referential integrity"
  },
  {
    id: 28,
    category: "Loading Patterns",
    section: "Ingest & Transform",
    question: "What are Slowly Changing Dimensions (SCD) types?",
    answer: "Type 0: Fixed attributes, never change\n\nType 1: Overwrite old values, no history\n\nType 2: Track history with new rows, start/end dates, current flag\n\nType 3: Store previous value in separate column\n\nType 4: Mini-dimensions for frequently changing attributes\n\nType 6: Hybrid (1+2+3)"
  },
  {
    id: 29,
    category: "Loading Patterns",
    section: "Ingest & Transform",
    question: "What loading patterns exist for streaming data?",
    answer: "• Lambda architecture: Batch + real-time layers\n• Kappa architecture: Stream processing only\n• Micro-batch processing (Spark Structured Streaming)\n• Event-driven ingestion\n• Real-time materialized views\n• Windowed aggregations\n• Exactly-once vs at-least-once semantics"
  },

  // Batch Data
  {
    id: 30,
    category: "Batch Ingestion",
    section: "Ingest & Transform",
    question: "What data stores are available in Fabric for batch data?",
    answer: "• Lakehouse: Delta tables on OneLake\n• Data Warehouse: T-SQL analytics engine\n• Eventhouse: Real-time analytics (KQL)\n• KQL Database: Time-series/log data\n\nAll share OneLake storage with different access patterns."
  },
  {
    id: 31,
    category: "Batch Ingestion",
    section: "Ingest & Transform",
    question: "When should you use dataflows vs. notebooks vs. T-SQL vs. KQL?",
    answer: "Dataflows:\n• Low-code ETL\n• Power Query transformations\n• Citizen developer friendly\n\nNotebooks:\n• Complex PySpark/Scala\n• ML workloads\n• Custom logic\n\nT-SQL:\n• Warehouse transformations\n• Familiar SQL syntax\n• Stored procedures\n\nKQL:\n• Time-series analysis\n• Log analytics\n• Real-time queries"
  },
  {
    id: 32,
    category: "Batch Ingestion",
    section: "Ingest & Transform",
    question: "What are shortcuts in Microsoft Fabric?",
    answer: "Shortcuts provide virtual pointers to data:\n\n• No data copying required\n• Support ADLS Gen2, S3, Google Cloud Storage\n• Enable OneLake federation\n• Internal shortcuts within OneLake\n• External shortcuts to cloud storage\n• Appear as native lakehouse tables/folders"
  },
  {
    id: 33,
    category: "Batch Ingestion",
    section: "Ingest & Transform",
    question: "What is Mirroring in Microsoft Fabric?",
    answer: "Mirroring replicates external databases to OneLake:\n\nSupported sources:\n• Azure SQL Database\n• Azure Cosmos DB\n• Snowflake\n• Azure SQL Managed Instance\n\nFeatures:\n• Near real-time sync\n• Delta format in OneLake\n• No ETL pipeline needed\n• Automatic schema sync"
  },
  {
    id: 34,
    category: "Batch Ingestion",
    section: "Ingest & Transform",
    question: "What Copy Data activities are available in pipelines?",
    answer: "Copy activity features:\n• 100+ source connectors\n• Bulk insert optimization\n• Parallel copy\n• Staging via ADLS\n• Mapping transformations\n• Fault tolerance options\n• Performance tuning (DIU, parallelism)\n• Native format conversion"
  },
  {
    id: 35,
    category: "Batch Transformation",
    section: "Ingest & Transform",
    question: "What are key PySpark transformation functions?",
    answer: "Common transformations:\n• select(), filter(), where()\n• groupBy(), agg(), count(), sum()\n• join(), union(), distinct()\n• withColumn(), drop()\n• orderBy(), limit()\n• pivot(), unpivot()\n• window functions (row_number, rank)"
  },
  {
    id: 36,
    category: "Batch Transformation",
    section: "Ingest & Transform",
    question: "How do you denormalize data in Fabric?",
    answer: "Techniques:\n• JOIN multiple tables into one\n• Flatten nested structures\n• Pre-aggregate common calculations\n• Create wide fact tables\n• Embed dimension attributes in facts\n• Use MERGE for delta updates\n\nBenefits:\n• Faster query performance\n• Simpler analytics queries\n• Reduced joins at runtime"
  },
  {
    id: 37,
    category: "Batch Transformation",
    section: "Ingest & Transform",
    question: "How do you handle duplicate data?",
    answer: "Detection:\n• ROW_NUMBER() window function\n• GROUP BY with HAVING COUNT > 1\n• distinct() in PySpark\n\nResolution:\n• Keep first/last occurrence\n• MERGE with matched condition\n• dropDuplicates() in PySpark\n• CDC with primary keys"
  },
  {
    id: 38,
    category: "Batch Transformation",
    section: "Ingest & Transform",
    question: "How do you handle missing data?",
    answer: "Strategies:\n• fillna() / coalesce() for defaults\n• Drop rows with dropna()\n• Imputation (mean, median, mode)\n• Forward/backward fill\n• Flag as 'Unknown' category\n• Use ISNULL() in T-SQL\n\nConsiderations:\n• Business rules for null handling\n• Impact on analytics"
  },
  {
    id: 39,
    category: "Batch Transformation",
    section: "Ingest & Transform",
    question: "How do you handle late-arriving data?",
    answer: "Strategies:\n• Watermarks with grace periods\n• Reprocess affected partitions\n• Use event time vs processing time\n• Delta Lake MERGE for updates\n• SCD Type 2 for dimension changes\n• Replay from durable storage\n• Idempotent processing design"
  },

  // Streaming Data
  {
    id: 40,
    category: "Streaming Ingestion",
    section: "Ingest & Transform",
    question: "What streaming engines are available in Fabric?",
    answer: "• Eventstreams: Native Fabric streaming\n• Spark Structured Streaming: PySpark streaming\n• Real-Time Intelligence: KQL-based streaming\n\nIntegration with:\n• Azure Event Hubs\n• Kafka\n• IoT Hub"
  },
  {
    id: 41,
    category: "Streaming Ingestion",
    section: "Ingest & Transform",
    question: "When should you use native storage vs. mirrored vs. shortcuts in Real-Time Intelligence?",
    answer: "Native storage:\n• High-frequency ingestion\n• Best query performance\n• Full control over schema\n\nMirrored storage:\n• Sync from external DBs\n• Near real-time updates\n\nShortcuts:\n• Access existing OneLake data\n• Avoid duplication\n• Cross-workload queries"
  },
  {
    id: 42,
    category: "Streaming Ingestion",
    section: "Ingest & Transform",
    question: "What are Eventstreams in Microsoft Fabric?",
    answer: "Eventstreams process streaming data:\n\nSources:\n• Azure Event Hubs\n• Custom apps\n• Sample data\n\nDestinations:\n• Lakehouse\n• KQL Database\n• Eventhouse\n• Derived streams\n\nFeatures:\n• No-code transformations\n• Real-time routing\n• Event processing"
  },
  {
    id: 43,
    category: "Streaming Ingestion",
    section: "Ingest & Transform",
    question: "How does Spark Structured Streaming work?",
    answer: "Key concepts:\n• Micro-batch processing model\n• Exactly-once semantics\n• Checkpointing for fault tolerance\n• Triggers (processingTime, once, continuous)\n• Output modes: append, complete, update\n• Watermarking for late data\n• Streaming DataFrames"
  },
  {
    id: 44,
    category: "Streaming Ingestion",
    section: "Ingest & Transform",
    question: "What streaming operations can you perform with KQL?",
    answer: "• Ingestion from Event Hubs\n• Update policies for transformations\n• Materialized views for aggregations\n• Streaming ingestion APIs\n• Near real-time queries\n• Time-series functions\n• Anomaly detection"
  },
  {
    id: 45,
    category: "Streaming Ingestion",
    section: "Ingest & Transform",
    question: "What are windowing functions in streaming?",
    answer: "Tumbling window:\n• Fixed-size, non-overlapping\n• Each event in exactly one window\n\nHopping window:\n• Fixed-size, overlapping\n• Events in multiple windows\n\nSliding window:\n• Triggered by events\n• Variable window boundaries\n\nSession window:\n• Gap-based timeout\n• Groups related events"
  },

  // SECTION 3: Monitor and optimize (30-35%)
  // Monitoring
  {
    id: 46,
    category: "Monitoring",
    section: "Monitor & Optimize",
    question: "How do you monitor data ingestion in Fabric?",
    answer: "• Pipeline run history and logs\n• Copy activity metrics (rows, duration)\n• Dataflow refresh history\n• Spark application monitoring\n• OneLake metrics\n• Monitoring hub in Fabric portal\n• Azure Monitor integration"
  },
  {
    id: 47,
    category: "Monitoring",
    section: "Monitor & Optimize",
    question: "How do you monitor data transformation in Fabric?",
    answer: "• Notebook execution logs\n• Spark UI for job details\n• Stage/task level metrics\n• Memory and CPU utilization\n• Shuffle read/write stats\n• Data skew indicators\n• Query execution plans (T-SQL)"
  },
  {
    id: 48,
    category: "Monitoring",
    section: "Monitor & Optimize",
    question: "How do you monitor semantic model refresh?",
    answer: "• Refresh history in workspace\n• Duration and status tracking\n• Failure notifications\n• Power BI REST API metrics\n• Incremental refresh monitoring\n• Partition refresh status\n• Query performance analyzer"
  },
  {
    id: 49,
    category: "Monitoring",
    section: "Monitor & Optimize",
    question: "How do you configure alerts in Fabric?",
    answer: "• Data activator for real-time alerts\n• Pipeline failure notifications\n• Email/Teams integration\n• Metric-based triggers\n• Custom alert conditions\n• Azure Monitor alerts\n• Log Analytics alert rules"
  },

  // Error Resolution
  {
    id: 50,
    category: "Error Resolution",
    section: "Monitor & Optimize",
    question: "How do you identify and resolve pipeline errors?",
    answer: "Identification:\n• Run history status\n• Activity output logs\n• Error messages and codes\n\nCommon issues:\n• Connection failures → Check credentials\n• Timeout → Increase limits\n• Data type mismatches → Fix mappings\n• Permission errors → Check RBAC"
  },
  {
    id: 51,
    category: "Error Resolution",
    section: "Monitor & Optimize",
    question: "How do you identify and resolve dataflow errors?",
    answer: "Identification:\n• Refresh failure messages\n• Power Query diagnostics\n• Step-by-step error tracing\n\nCommon issues:\n• Source connectivity → Verify gateway\n• Formula errors → Check M syntax\n• Memory issues → Optimize transformations\n• Timeout → Enable staging"
  },
  {
    id: 52,
    category: "Error Resolution",
    section: "Monitor & Optimize",
    question: "How do you identify and resolve notebook errors?",
    answer: "Identification:\n• Cell execution errors\n• Spark UI exceptions\n• Driver/executor logs\n\nCommon issues:\n• OOM errors → Increase memory/partitions\n• Job failures → Check Spark configs\n• Library conflicts → Version management\n• Data errors → Add validation"
  },
  {
    id: 53,
    category: "Error Resolution",
    section: "Monitor & Optimize",
    question: "How do you identify and resolve Eventhouse errors?",
    answer: "Identification:\n• Ingestion failures log\n• .show ingestion failures\n• Data management insights\n\nCommon issues:\n• Schema mismatch → Update mapping\n• Size limits → Check blob size\n• Throttling → Implement backoff\n• Format errors → Validate JSON/CSV"
  },
  {
    id: 54,
    category: "Error Resolution",
    section: "Monitor & Optimize",
    question: "How do you identify and resolve Eventstream errors?",
    answer: "Identification:\n• Stream health dashboard\n• Ingestion metrics\n• Dead-letter analysis\n\nCommon issues:\n• Schema drift → Update schema\n• Throughput limits → Scale partitions\n• Deserialization → Fix event format\n• Connectivity → Check network/firewall"
  },
  {
    id: 55,
    category: "Error Resolution",
    section: "Monitor & Optimize",
    question: "How do you identify and resolve T-SQL errors?",
    answer: "Identification:\n• Query error messages\n• sys.dm_exec_requests\n• Execution plans\n\nCommon issues:\n• Syntax errors → Fix SQL statement\n• Object not found → Check schema\n• Permission denied → Grant access\n• Deadlocks → Optimize transactions"
  },

  // Performance Optimization
  {
    id: 56,
    category: "Performance",
    section: "Monitor & Optimize",
    question: "How do you optimize a lakehouse table?",
    answer: "• OPTIMIZE command for file compaction\n• VACUUM to remove old files\n• Z-ORDER for frequently filtered columns\n• Partitioning strategy\n• V-Order optimization\n• Appropriate file sizes (target ~1GB)\n• ANALYZE for statistics\n• Bloom filters for lookups"
  },
  {
    id: 57,
    category: "Performance",
    section: "Monitor & Optimize",
    question: "What is V-Order optimization in Fabric?",
    answer: "V-Order is a write-time optimization:\n\n• Parquet file optimization\n• Faster read performance\n• Better compression\n• Enabled by default in Fabric\n• Optimized for Power BI queries\n• Compatible with all Parquet readers\n• 10-50% faster queries typically"
  },
  {
    id: 58,
    category: "Performance",
    section: "Monitor & Optimize",
    question: "How do you optimize pipelines?",
    answer: "• Parallel execution where possible\n• Appropriate Data Integration Units (DIU)\n• Staging for large copies\n• Partitioned data loading\n• Minimize activity dependencies\n• Use variables efficiently\n• Configure appropriate timeouts\n• Enable retry policies"
  },
  {
    id: 59,
    category: "Performance",
    section: "Monitor & Optimize",
    question: "How do you optimize a data warehouse in Fabric?",
    answer: "• Table distribution (HASH, ROUND_ROBIN, REPLICATE)\n• Statistics management\n• Result set caching\n• Workload management\n• Concurrency limits\n• Query hints\n• Avoid SELECT *\n• Proper indexing strategy"
  },
  {
    id: 60,
    category: "Performance",
    section: "Monitor & Optimize",
    question: "How do you optimize Eventstreams and Eventhouses?",
    answer: "Eventstreams:\n• Partition for parallelism\n• Batch size tuning\n• Compression settings\n\nEventhouses:\n• Ingestion batching policy\n• Caching policy\n• Data partitioning\n• Extent merge policies\n• Hot/cold data tiers"
  },
  {
    id: 61,
    category: "Performance",
    section: "Monitor & Optimize",
    question: "How do you optimize Spark performance in Fabric?",
    answer: "• Partition optimization (repartition/coalesce)\n• Broadcast joins for small tables\n• Cache/persist frequently used DataFrames\n• Avoid UDFs when built-in functions exist\n• Appropriate Spark pool sizing\n• File format optimization (Delta)\n• Predicate pushdown\n• AQE (Adaptive Query Execution)"
  },
  {
    id: 62,
    category: "Performance",
    section: "Monitor & Optimize",
    question: "How do you optimize query performance in Fabric?",
    answer: "General strategies:\n• Filter early, reduce data scanned\n• Use appropriate data types\n• Avoid correlated subqueries\n• Leverage materialized views\n• Partition pruning\n• Statistics updates\n• Index usage analysis\n• Query plan analysis"
  },
  
  // Additional Key Topics
  {
    id: 63,
    category: "Key Concepts",
    section: "Core Knowledge",
    question: "What is OneLake in Microsoft Fabric?",
    answer: "OneLake is Fabric's unified storage layer:\n\n• Single data lake for entire organization\n• Built on ADLS Gen2\n• Automatic tenant-wide provisioning\n• Delta Parquet format by default\n• Hierarchical namespace\n• One copy of data, multiple engines\n• Shortcuts for federation"
  },
  {
    id: 64,
    category: "Key Concepts",
    section: "Core Knowledge",
    question: "What is Direct Lake mode?",
    answer: "Direct Lake connects Power BI directly to Delta tables:\n\n• No data import required\n• Near real-time data access\n• Combines DirectQuery speed with Import performance\n• Automatic fallback to DirectQuery\n• Requires data in OneLake\n• Frame capacity limitations"
  },
  {
    id: 65,
    category: "Key Concepts",
    section: "Core Knowledge",
    question: "What are the key differences between Lakehouse and Warehouse in Fabric?",
    answer: "Lakehouse:\n• Delta tables + files\n• Spark and SQL access\n• Schema-on-read flexibility\n• Better for data engineering\n\nWarehouse:\n• T-SQL optimized\n• Full SQL Server compatibility\n• Schema-on-write\n• Better for BI/analytics\n\nBoth use OneLake storage."
  },
  {
    id: 66,
    category: "Key Concepts",
    section: "Core Knowledge",
    question: "What is Delta Lake and why is it important?",
    answer: "Delta Lake is the default format in Fabric:\n\n• ACID transactions\n• Time travel (versioning)\n• Schema enforcement/evolution\n• Audit history\n• Unified batch/streaming\n• MERGE (upsert) support\n• OPTIMIZE and VACUUM commands\n• Open format (Parquet + logs)"
  },
  {
    id: 67,
    category: "Key Concepts",
    section: "Core Knowledge",
    question: "What KQL functions should you know for DP-700?",
    answer: "Essential KQL operators:\n• where, project, extend\n• summarize, count, sum, avg\n• join, union\n• render (visualization)\n• mv-expand (arrays)\n• parse (text extraction)\n• time-series: make-series, series_*\n• bin() for time grouping"
  },
  {
    id: 68,
    category: "Key Concepts",
    section: "Core Knowledge",
    question: "What is the Fabric capacity model?",
    answer: "Capacity-based licensing:\n\n• F SKUs (F2, F4, F8... F2048)\n• Capacity Units (CUs) for compute\n• Shared across all workloads\n• Burst and smoothing\n• Pay-per-use or reserved\n• Workspace assignment to capacities\n• Admin controls for throttling"
  },
  {
    id: 69,
    category: "Key Concepts",
    section: "Core Knowledge",
    question: "What SQL features are available in Fabric Warehouse?",
    answer: "Supported:\n• SELECT, INSERT, UPDATE, DELETE\n• CTEs and window functions\n• Stored procedures\n• Views and materialized views\n• Cross-database queries\n\nNot supported:\n• User-defined functions\n• Triggers\n• Temporal tables\n• Some advanced T-SQL features"
  },
  {
    id: 70,
    category: "Key Concepts",
    section: "Core Knowledge",
    question: "What is Microsoft Purview integration with Fabric?",
    answer: "Purview provides governance:\n\n• Data catalog and discovery\n• Data lineage tracking\n• Sensitivity labels\n• Data classification\n• Business glossary\n• Data quality rules\n• Automated scanning\n• Unified governance across Azure"
  }
];

export default function DP700Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedSection, setSelectedSection] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [studyMode, setStudyMode] = useState("browse"); // browse, quiz
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [shuffled, setShuffled] = useState(false);
  const [cards, setCards] = useState(flashcardData);
  const [markedCards, setMarkedCards] = useState(new Set());
  const [showMarkedOnly, setShowMarkedOnly] = useState(false);

  const sections = ["All", ...new Set(flashcardData.map(card => card.section))];
  const categories = ["All", ...new Set(flashcardData.map(card => card.category))];

  useEffect(() => {
    let filtered = flashcardData;
    
    if (selectedSection !== "All") {
      filtered = filtered.filter(card => card.section === selectedSection);
    }
    if (selectedCategory !== "All") {
      filtered = filtered.filter(card => card.category === selectedCategory);
    }
    if (showMarkedOnly) {
      filtered = filtered.filter(card => markedCards.has(card.id));
    }
    
    if (shuffled) {
      filtered = [...filtered].sort(() => Math.random() - 0.5);
    }
    
    setCards(filtered);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedSection, selectedCategory, shuffled, showMarkedOnly, markedCards]);

  const currentCard = cards[currentIndex];

  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === " " || e.key === "Enter") {
      setIsFlipped(!isFlipped);
    } else if (e.key === "ArrowRight") {
      nextCard();
    } else if (e.key === "ArrowLeft") {
      prevCard();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentIndex, isFlipped, cards]);

  const markCorrect = () => {
    setScore({ ...score, correct: score.correct + 1 });
    nextCard();
  };

  const markIncorrect = () => {
    setScore({ ...score, incorrect: score.incorrect + 1 });
    nextCard();
  };

  const toggleMark = (id) => {
    const newMarked = new Set(markedCards);
    if (newMarked.has(id)) {
      newMarked.delete(id);
    } else {
      newMarked.add(id);
    }
    setMarkedCards(newMarked);
  };

  const resetQuiz = () => {
    setScore({ correct: 0, incorrect: 0 });
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  if (!currentCard) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        color: "#e2e8f0"
      }}>
        <div style={{
          background: "rgba(30, 41, 59, 0.8)",
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          padding: "48px",
          textAlign: "center",
          border: "1px solid rgba(148, 163, 184, 0.1)"
        }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>📚</div>
          <h2 style={{ fontSize: "24px", marginBottom: "12px" }}>No Cards Found</h2>
          <p style={{ color: "#94a3b8" }}>Try adjusting your filters or adding some marked cards.</p>
          <button 
            onClick={() => {
              setSelectedSection("All");
              setSelectedCategory("All");
              setShowMarkedOnly(false);
            }}
            style={{
              marginTop: "24px",
              padding: "12px 24px",
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              border: "none",
              borderRadius: "12px",
              color: "white",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600"
            }}
          >
            Reset Filters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
      padding: "24px",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: "#e2e8f0"
    }}>
      {/* Header */}
      <div style={{
        maxWidth: "1000px",
        margin: "0 auto 24px",
        textAlign: "center"
      }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "12px",
          background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
          padding: "8px 20px",
          borderRadius: "50px",
          marginBottom: "16px"
        }}>
          <span style={{ fontSize: "20px" }}>🎓</span>
          <span style={{ fontWeight: "700", letterSpacing: "1px" }}>DP-700 EXAM PREP</span>
        </div>
        <h1 style={{
          fontSize: "32px",
          fontWeight: "800",
          marginBottom: "8px",
          background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Microsoft Fabric Data Engineer
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "14px" }}>
          {cards.length} flashcards • Use ← → arrows or buttons to navigate • Space to flip
        </p>
      </div>

      {/* Controls */}
      <div style={{
        maxWidth: "1000px",
        margin: "0 auto 24px",
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          style={{
            padding: "10px 16px",
            borderRadius: "12px",
            border: "1px solid rgba(148, 163, 184, 0.2)",
            background: "rgba(30, 41, 59, 0.8)",
            color: "#e2e8f0",
            fontSize: "14px",
            cursor: "pointer",
            minWidth: "180px"
          }}
        >
          {sections.map(s => (
            <option key={s} value={s}>{s === "All" ? "📋 All Sections" : `📂 ${s}`}</option>
          ))}
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: "10px 16px",
            borderRadius: "12px",
            border: "1px solid rgba(148, 163, 184, 0.2)",
            background: "rgba(30, 41, 59, 0.8)",
            color: "#e2e8f0",
            fontSize: "14px",
            cursor: "pointer",
            minWidth: "180px"
          }}
        >
          {categories.map(c => (
            <option key={c} value={c}>{c === "All" ? "🏷️ All Categories" : `📁 ${c}`}</option>
          ))}
        </select>

        <button
          onClick={() => setShuffled(!shuffled)}
          style={{
            padding: "10px 20px",
            borderRadius: "12px",
            border: "1px solid rgba(148, 163, 184, 0.2)",
            background: shuffled ? "linear-gradient(135deg, #3b82f6, #8b5cf6)" : "rgba(30, 41, 59, 0.8)",
            color: "#e2e8f0",
            fontSize: "14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          🔀 {shuffled ? "Shuffled" : "Shuffle"}
        </button>

        <button
          onClick={() => setShowMarkedOnly(!showMarkedOnly)}
          style={{
            padding: "10px 20px",
            borderRadius: "12px",
            border: "1px solid rgba(148, 163, 184, 0.2)",
            background: showMarkedOnly ? "linear-gradient(135deg, #f59e0b, #ef4444)" : "rgba(30, 41, 59, 0.8)",
            color: "#e2e8f0",
            fontSize: "14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          ⭐ Marked ({markedCards.size})
        </button>

        <button
          onClick={() => setStudyMode(studyMode === "browse" ? "quiz" : "browse")}
          style={{
            padding: "10px 20px",
            borderRadius: "12px",
            border: "none",
            background: studyMode === "quiz" ? "linear-gradient(135deg, #10b981, #059669)" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "white",
            fontSize: "14px",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          {studyMode === "browse" ? "🎯 Start Quiz" : "📖 Browse Mode"}
        </button>
      </div>

      {/* Quiz Score */}
      {studyMode === "quiz" && (
        <div style={{
          maxWidth: "1000px",
          margin: "0 auto 24px",
          display: "flex",
          justifyContent: "center",
          gap: "24px",
          alignItems: "center"
        }}>
          <div style={{
            background: "rgba(34, 197, 94, 0.2)",
            padding: "12px 24px",
            borderRadius: "12px",
            border: "1px solid rgba(34, 197, 94, 0.3)"
          }}>
            <span style={{ color: "#4ade80", fontWeight: "700", fontSize: "20px" }}>✓ {score.correct}</span>
          </div>
          <div style={{
            background: "rgba(239, 68, 68, 0.2)",
            padding: "12px 24px",
            borderRadius: "12px",
            border: "1px solid rgba(239, 68, 68, 0.3)"
          }}>
            <span style={{ color: "#f87171", fontWeight: "700", fontSize: "20px" }}>✗ {score.incorrect}</span>
          </div>
          <button
            onClick={resetQuiz}
            style={{
              padding: "12px 20px",
              borderRadius: "12px",
              border: "1px solid rgba(148, 163, 184, 0.2)",
              background: "rgba(30, 41, 59, 0.8)",
              color: "#e2e8f0",
              cursor: "pointer",
              fontSize: "14px"
            }}
          >
            🔄 Reset Score
          </button>
        </div>
      )}

      {/* Flashcard */}
      <div style={{
        maxWidth: "800px",
        margin: "0 auto",
        perspective: "1000px"
      }}>
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          style={{
            position: "relative",
            minHeight: "400px",
            cursor: "pointer",
            transformStyle: "preserve-3d",
            transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0)"
          }}
        >
          {/* Front */}
          <div style={{
            position: "absolute",
            width: "100%",
            minHeight: "400px",
            backfaceVisibility: "hidden",
            background: "linear-gradient(145deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95))",
            backdropFilter: "blur(20px)",
            borderRadius: "24px",
            padding: "32px",
            border: "1px solid rgba(148, 163, 184, 0.1)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            display: "flex",
            flexDirection: "column"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "24px"
            }}>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <span style={{
                  background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "600"
                }}>
                  {currentCard.section}
                </span>
                <span style={{
                  background: "rgba(148, 163, 184, 0.2)",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "12px"
                }}>
                  {currentCard.category}
                </span>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); toggleMark(currentCard.id); }}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                  filter: markedCards.has(currentCard.id) ? "none" : "grayscale(100%)",
                  opacity: markedCards.has(currentCard.id) ? 1 : 0.5,
                  transition: "all 0.2s"
                }}
              >
                ⭐
              </button>
            </div>
            
            <div style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <h2 style={{
                fontSize: "24px",
                fontWeight: "600",
                lineHeight: "1.5",
                textAlign: "center",
                color: "#f1f5f9"
              }}>
                {currentCard.question}
              </h2>
            </div>
            
            <div style={{
              textAlign: "center",
              color: "#64748b",
              fontSize: "14px",
              marginTop: "24px"
            }}>
              👆 Click or press Space to reveal answer
            </div>
          </div>

          {/* Back */}
          <div style={{
            position: "absolute",
            width: "100%",
            minHeight: "400px",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(145deg, rgba(30, 58, 45, 0.95), rgba(15, 35, 25, 0.95))",
            backdropFilter: "blur(20px)",
            borderRadius: "24px",
            padding: "32px",
            border: "1px solid rgba(74, 222, 128, 0.2)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            display: "flex",
            flexDirection: "column"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px"
            }}>
              <span style={{
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                padding: "6px 14px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "600"
              }}>
                ✓ ANSWER
              </span>
            </div>
            
            <div style={{
              flex: 1,
              display: "flex",
              alignItems: "center"
            }}>
              <pre style={{
                fontSize: "16px",
                lineHeight: "1.8",
                color: "#d1fae5",
                whiteSpace: "pre-wrap",
                fontFamily: "'Segoe UI', system-ui, sans-serif",
                margin: 0,
                width: "100%"
              }}>
                {currentCard.answer}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={{
        maxWidth: "800px",
        margin: "32px auto 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px"
      }}>
        {studyMode === "quiz" ? (
          <>
            <button
              onClick={markIncorrect}
              style={{
                padding: "16px 32px",
                borderRadius: "16px",
                border: "none",
                background: "linear-gradient(135deg, #ef4444, #dc2626)",
                color: "white",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 10px 30px -10px rgba(239, 68, 68, 0.5)"
              }}
            >
              ✗ Didn't Know
            </button>
            <button
              onClick={markCorrect}
              style={{
                padding: "16px 32px",
                borderRadius: "16px",
                border: "none",
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                color: "white",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 10px 30px -10px rgba(34, 197, 94, 0.5)"
              }}
            >
              ✓ Got It!
            </button>
          </>
        ) : (
          <>
            <button
              onClick={prevCard}
              disabled={currentIndex === 0}
              style={{
                padding: "16px 28px",
                borderRadius: "16px",
                border: "1px solid rgba(148, 163, 184, 0.2)",
                background: currentIndex === 0 ? "rgba(30, 41, 59, 0.5)" : "rgba(30, 41, 59, 0.8)",
                color: currentIndex === 0 ? "#475569" : "#e2e8f0",
                fontSize: "16px",
                cursor: currentIndex === 0 ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              ← Previous
            </button>
            
            <div style={{
              background: "rgba(30, 41, 59, 0.8)",
              padding: "12px 24px",
              borderRadius: "12px",
              border: "1px solid rgba(148, 163, 184, 0.2)",
              minWidth: "120px",
              textAlign: "center"
            }}>
              <span style={{ fontWeight: "700", color: "#60a5fa" }}>{currentIndex + 1}</span>
              <span style={{ color: "#64748b" }}> / {cards.length}</span>
            </div>
            
            <button
              onClick={nextCard}
              disabled={currentIndex === cards.length - 1}
              style={{
                padding: "16px 28px",
                borderRadius: "16px",
                border: "none",
                background: currentIndex === cards.length - 1 
                  ? "rgba(99, 102, 241, 0.3)" 
                  : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: currentIndex === cards.length - 1 ? "#818cf8" : "white",
                fontSize: "16px",
                cursor: currentIndex === cards.length - 1 ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontWeight: "600",
                boxShadow: currentIndex === cards.length - 1 ? "none" : "0 10px 30px -10px rgba(99, 102, 241, 0.5)"
              }}
            >
              Next →
            </button>
          </>
        )}
      </div>

      {/* Progress Bar */}
      <div style={{
        maxWidth: "800px",
        margin: "32px auto 0"
      }}>
        <div style={{
          background: "rgba(30, 41, 59, 0.8)",
          borderRadius: "12px",
          height: "8px",
          overflow: "hidden"
        }}>
          <div style={{
            height: "100%",
            width: `${((currentIndex + 1) / cards.length) * 100}%`,
            background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)",
            transition: "width 0.3s ease",
            borderRadius: "12px"
          }} />
        </div>
      </div>

      {/* Keyboard Hints */}
      <div style={{
        maxWidth: "800px",
        margin: "24px auto 0",
        display: "flex",
        justifyContent: "center",
        gap: "24px",
        color: "#64748b",
        fontSize: "13px"
      }}>
        <span>⌨️ <kbd style={{ background: "rgba(148, 163, 184, 0.2)", padding: "2px 8px", borderRadius: "4px" }}>←</kbd> <kbd style={{ background: "rgba(148, 163, 184, 0.2)", padding: "2px 8px", borderRadius: "4px" }}>→</kbd> Navigate</span>
        <span><kbd style={{ background: "rgba(148, 163, 184, 0.2)", padding: "2px 8px", borderRadius: "4px" }}>Space</kbd> Flip</span>
      </div>
    </div>
  );
}
